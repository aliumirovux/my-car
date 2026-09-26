import type { IconName } from '@/theme';

import { Badge } from '../ui/Badge';
import { ListItem } from '../ui/ListItem';
import { documentStatusTone, toneIcon, type DocumentStatus } from './status';

export interface DocumentRowProps {
  /** Document type or title, e.g. "OSAGO". */
  title: string;
  /** e.g. "Expires 10.10.2026". */
  subtitle?: string;
  status: DocumentStatus;
  statusLabel: string;
  icon?: IconName;
  onPress?: () => void;
}

export function DocumentRow({ title, subtitle, status, statusLabel, icon = 'document', onPress }: DocumentRowProps) {
  const tone = documentStatusTone[status];
  return (
    <ListItem
      leadingIcon={icon}
      title={title}
      subtitle={subtitle}
      trailing={status === 'replaced' ? undefined : <Badge label={statusLabel} tone={tone} icon={toneIcon[tone]} />}
      onPress={onPress}
      accessibilityLabel={[title, subtitle, status === 'replaced' ? undefined : statusLabel].filter(Boolean).join(', ')}
    />
  );
}
