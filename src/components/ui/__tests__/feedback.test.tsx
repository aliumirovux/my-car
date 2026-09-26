import { act, fireEvent, screen } from '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';

import { renderWithTheme } from '@/test/render';

import {
  Badge,
  Button,
  EmptyState,
  ErrorState,
  ListItem,
  LoadingState,
  Modal,
  ProgressBar,
  StatCard,
  clampProgress,
  useSnackbar,
} from '..';

describe('Snackbar', () => {
  function Trigger({ onAction }: { onAction: () => void }) {
    const snackbar = useSnackbar();
    return <Button label="Save" onPress={() => snackbar.show({ message: 'Saved', actionLabel: 'Undo', onAction })} />;
  }

  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('announces the message, runs the action and dismisses', () => {
    const announce = jest.spyOn(AccessibilityInfo, 'announceForAccessibility');
    const onAction = jest.fn();
    renderWithTheme(<Trigger onAction={onAction} />);
    fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('Saved')).toBeOnTheScreen();
    expect(announce).toHaveBeenCalledWith('Saved');
    fireEvent.press(screen.getByRole('button', { name: 'Undo' }));
    expect(onAction).toHaveBeenCalled();
    expect(screen.queryByText('Saved')).toBeNull();
  });

  it('auto-dismisses after its duration', () => {
    renderWithTheme(<Trigger onAction={() => {}} />);
    fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    act(() => jest.advanceTimersByTime(6000));
    expect(screen.queryByText('Saved')).toBeNull();
  });
});

describe('Modal', () => {
  it('shows title and message and wires both actions', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    renderWithTheme(
      <Modal
        visible
        destructive
        title="Delete entry?"
        message="Totals will be recalculated."
        onDismiss={onCancel}
        primaryAction={{ label: 'Delete', onPress: onConfirm }}
        secondaryAction={{ label: 'Cancel', onPress: onCancel }}
      />,
    );
    expect(screen.getByRole('header', { name: 'Delete entry?' })).toBeOnTheScreen();
    fireEvent.press(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));
    expect(onConfirm).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });

  it('locks the cancel action while the primary action is loading', () => {
    renderWithTheme(
      <Modal
        visible
        title="Deleting"
        onDismiss={() => {}}
        primaryAction={{ label: 'Delete', onPress: () => {}, loading: true }}
        secondaryAction={{ label: 'Cancel', onPress: () => {} }}
      />,
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeBusy();
  });
});

describe('State views', () => {
  it('EmptyState offers the next action', () => {
    const onAction = jest.fn();
    renderWithTheme(<EmptyState title="No records" actionLabel="Add fuel" onAction={onAction} />);
    fireEvent.press(screen.getByRole('button', { name: 'Add fuel' }));
    expect(onAction).toHaveBeenCalled();
  });

  it('ErrorState uses localized defaults and retries', () => {
    const onRetry = jest.fn();
    renderWithTheme(<ErrorState onRetry={onRetry} />);
    expect(screen.getByText('Nimadir notoʻgʻri ketdi')).toBeOnTheScreen();
    fireEvent.press(screen.getByRole('button', { name: 'Qayta urinish' }));
    expect(onRetry).toHaveBeenCalled();
  });

  it('LoadingState is announced as busy', () => {
    renderWithTheme(<LoadingState />);
    expect(screen.getByRole('progressbar', { name: 'Yuklanmoqda…' })).toBeBusy();
  });
});

describe('Display components', () => {
  it('Badge exposes its text (status is never color-only)', () => {
    renderWithTheme(<Badge label="Overdue" tone="error" icon="error" />);
    expect(screen.getByLabelText('Overdue')).toBeOnTheScreen();
  });

  it('ProgressBar clamps and reports a percentage', () => {
    expect(clampProgress(1.4)).toBe(1);
    expect(clampProgress(-1)).toBe(0);
    expect(clampProgress(Number.NaN)).toBe(0);
    renderWithTheme(<ProgressBar value={0.38} accessibilityLabel="Oil interval" />);
    expect(screen.getByRole('progressbar', { name: 'Oil interval' })).toHaveAccessibilityValue({ min: 0, max: 100, now: 38 });
  });

  it('StatCard reads as one phrase', () => {
    renderWithTheme(<StatCard label="This month" value="1 362 500 soʻm" caption="Last month: 1 120 000 soʻm" />);
    expect(screen.getByLabelText('This month, 1 362 500 soʻm, Last month: 1 120 000 soʻm')).toBeOnTheScreen();
  });

  it('ListItem exposes selected and disabled states', () => {
    const onPress = jest.fn();
    renderWithTheme(
      <>
        <ListItem title="AI-95" selected onPress={() => {}} accessibilityLabel="AI-95" />
        <ListItem title="Locked" disabled onPress={onPress} accessibilityLabel="Locked" />
      </>,
    );
    expect(screen.getByRole('button', { name: 'AI-95' })).toBeSelected();
    const locked = screen.getByRole('button', { name: 'Locked' });
    fireEvent.press(locked);
    expect(onPress).not.toHaveBeenCalled();
    expect(locked).toBeDisabled();
  });
});
