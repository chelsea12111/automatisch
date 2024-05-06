import * as React from 'react';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { generateInternalLink } from 'helpers/translationValues';
import { useUserTrial } from 'hooks/useUserTrial';
import { useFormatMessage } from 'hooks/useFormatMessage';
import { URLS } from 'config/urls';

interface TrialOverAlertProps {
  trialOver: boolean;
}

const TrialOverAlertMemo = ({ trialOver }: TrialOverAlertProps) => {
  const formatMessage = useFormatMessage();
  const trialStatus = useUserTrial();

  const link = React.useMemo(() => {
    if (trialStatus && trialStatus.over) {
      return generateInternalLink(URLS.SETTINGS_PLAN_UPGRADE);
    }
    return '';
  }, [generateInternalLink, trialStatus, URLS.SETTINGS_PLAN_UPGRADE]);

  if (!trialOver || !trialStatus || !trialStatus.over) return <React.Fragment />;

  return (
    <Alert
      severity="error"
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography variant="subtitle2" sx={{ lineHeight: 1.5 }}>
        {formatMessage('trialOverAlert.text', { link })}
      </Typography>
    </Alert>
  );
};

const TrialOverAlert = React.memo(TrialOverAlertMemo);

export default TrialOverAlert;
