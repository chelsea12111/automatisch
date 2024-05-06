import * as React from 'react';
import { useMatch } from 'react-router-dom';
import ListItem from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

export default function ListItemLink({
  icon,
  primary,
  to,
  onClick,
  'data-test': dataTest,
  target,
}: {
  icon: React.ReactNode;
  primary: string;
  to: string;
  onClick?: () => void;
  'data-test'?: string;
  target?: string;
}) {
  const selected = useMatch({ path: to, end: true });

  const CustomLink = React.useCallback(
    (linkProps: React.ComponentProps<typeof RouterLink>) => {
      const [, pathname] = to.split('#') || [];

      try {
        // challenge the link to check if it's absolute URL
        new URL(to); // should throw an error if it's not an absolute URL
        return (
          <a
            {...linkProps}
            href={to}
            target={target}
            rel="noopener noreferrer"
          />
        );
      } catch (error) {
        if (error instanceof TypeError) {
          return (
            <RouterLink
              ref={linkProps.innerRef}
              to={pathname || to}
              onClick={(event) => {
                if (onClick) {
                  onClick();
                }

                // prevent the default click behavior for non-absolute URLs
                if (!pathname) {
                  event.preventDefault();
                }
              }}
              {...linkProps}
            />
          );
        }

        throw error;
      }
    },
    [to, onClick, target],
  );

  return (
    <li key={to}>
      <ListItem
        component={CustomLink}
        sx={{ pl: { xs: 2, sm: 3 } }}
        selected={!!selected}
        onClick={onClick}
        data-test={dataTest}
        target={target}
      >
        <ListItemIcon sx={{ minWidth: 52 }}>{icon}</ListItemIcon>
        <ListItemText
          primary={primary}
          primaryTypographyProps={{ variant: 'body1' }}
        />
      </ListItem>
    </li>
  );
}
