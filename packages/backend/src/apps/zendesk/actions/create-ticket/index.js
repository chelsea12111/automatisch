import defineAction from '../../../../helpers/define-action.js';
import Joi from 'joi';
import { fields } from './fields.js';
import isEmpty from 'lodash/isEmpty.js';
import axios from 'axios';

const schema = Joi.object({
  subject: Joi.string().required(),
  assigneeId: Joi.string().required(),
  groupId: Joi.string().required(),
  requesterName
