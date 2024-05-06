import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Can from 'components/Can';
import { useEnqueueSnackbar } from 'hooks/useEnqueueSnackbar';
import * as URLS from 'config/urls';
import useFormatMessage from 'hooks/useFormatMessage';
import { DELETE_FLOW, DUPLICATE_FLOW } from 'graphql/mutations/flow';

function ContextMenu({
  flowId,
  onClose,
  anchorEl,
  onDuplicateFlow,
  onDeleteFlow,
  appKey,
}) {
  const enqueueSnackbar = useEnqueueSnackbar();
  const formatMessage = useFormatMessage();
  const queryClient = useQueryClient();
  const [duplicateFlow] = useMutation(DUPLICATE_FLOW);
  const [deleteFlow] = useMutation(DELETE_FLOW);

  const handleFlowDuplicate = async () => {
    try {
      await duplicateFlow({ variables: { input: { id: flowId } } });
      await queryClient.invalidateQueries(['apps', appKey, 'flows']);
      enqueueSnackbar(formatMessage('flow.successfullyDuplicated'), {
        variant: 'success',
        'data-test': 'snackbar-duplicate-flow-success',
      });
      onDuplicateFlow?.();
      onClose();
    } catch (error) {
      console.error('Error duplicating flow:', error);
    }
  };

  const handleFlowDelete = async () => {
    try {
      await deleteFlow({
        variables: { input: { id: flowId } },
        update: (cache) => {
          const flowCacheId = cache.identify({
            __typename: 'Flow',
            id: flowId,
          });
          cache.evict({ id: flowCacheId });
        },
      });
      await queryClient.invalidateQueries(['apps', appKey, 'flows']);
      enqueueSnackbar(formatMessage('flow.successfullyDeleted'), {
        variant: 'success',
      });
      onDeleteFlow?.();
      onClose();
    } catch (error) {
      console.error('Error deleting flow:', error);
    }
  };

  return (
    <Menu open={true} onClose={onClose} hideBackdrop={false} anchorEl={anchorEl}>
      <Can I="read" a="Flow'>
        {(allowed) =>
          allowed && (
            <MenuItem component={Link} to={URLS.FLOW(flowId)}>
              {formatMessage('flow.view')}
            </MenuItem>
          )
        }
      </Can>

      <Can I="create" a="Flow">
        {(allowed) =>
          allowed && (
            <MenuItem onClick={handleFlowDuplicate}>
              {formatMessage('flow.duplicate')}
            </MenuItem>
          )
        }
      </Can>

      <Can I="delete" a="Flow">
        {(allowed) =>
          allowed && (
            <MenuItem onClick={handleFlowDelete}>
              {formatMessage('flow.delete')}
            </MenuItem>
          )
        }
      </Can>
    </Menu>
  );
}

ContextMenu.propTypes = {
  flowId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  onDeleteFlow: PropTypes.func,
  onDuplicateFlow: PropTypes.func,
  appKey: PropTypes.string.isRequired,
};

export default ContextMenu;
