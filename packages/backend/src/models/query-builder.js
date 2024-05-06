import { Model, QueryBuilder } from 'objection';

const DELETED_COLUMN_NAME = 'deleted_at' as const;

const supportsSoftDeletion = <T extends typeof Model>(modelClass: T) => {
  return (modelClass.jsonSchema.properties as any).deletedAt !== undefined;
};

const buildQueryBuilderForClass = <T extends typeof Model>(
  modelClass: T
) => {
  const qb = QueryBuilder.forClass(ExtendedQueryBuilder, modelClass);
  qb.onBuild((builder) => {
    if (
      !builder.context().withSoftDeleted &&
      supportsSoftDeletion(modelClass)
    ) {
      builder.whereNull(
        `${modelClass.tableName}.${DELETED_COLUMN_NAME}`
      );
    }
  });
  return qb;
};

class ExtendedQueryBuilder extends QueryBuilder {
  static forClass<T extends typeof Model>(
    modelClass: T
  ): QueryBuilder<InstanceType<T>> {
    return buildQueryBuilderForClass(modelClass);
  }

  delete = () => {
    if (supportsSoftDeletion(this.modelClass)) {
      return this.patch({
        [DELETED_COLUMN_NAME]: new Date().toISOString(),
      });
    }

    return super.delete();
  };

  hardDelete = () => super.delete();

  withSoftDeleted = () => {
    this.context().withSoftDeleted = true;
    return this;
  };

  restore = () => this.patch({
    [DELETED_COLUMN_NAME]: null,
  });
}

export default ExtendedQueryBuilder;
