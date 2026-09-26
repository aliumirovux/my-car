import { fireEvent, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { renderWithTheme } from '@/test/render';
import { darkColors, lightColors } from '@/theme/colors';

import { Button, Chip, IconButton, Input, SegmentedControl, Select } from '..';

describe('Button', () => {
  it('is an accessible button that fires onPress', () => {
    const onPress = jest.fn();
    renderWithTheme(<Button label="Save" onPress={onPress} />);
    fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire when disabled and exposes the disabled state', () => {
    const onPress = jest.fn();
    renderWithTheme(<Button label="Save" onPress={onPress} disabled />);
    const button = screen.getByRole('button', { name: 'Save' });
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('shows a spinner, is busy and ignores presses while loading', () => {
    const onPress = jest.fn();
    renderWithTheme(<Button label="Save" onPress={onPress} loading />);
    const button = screen.getByRole('button', { name: 'Save' });
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeBusy();
    expect(screen.getByTestId('button-spinner')).toBeOnTheScreen();
  });

  it('meets the 44 dp touch target in both sizes', () => {
    renderWithTheme(
      <>
        <Button label="Medium" onPress={() => {}} />
        <Button label="Small" size="sm" onPress={() => {}} />
      </>,
    );
    const md = screen.getByRole('button', { name: 'Medium' });
    expect(StyleSheet.flatten(md.props.style).minHeight).toBeGreaterThanOrEqual(44);
    const sm = screen.getByRole('button', { name: 'Small' });
    const smHeight = StyleSheet.flatten(sm.props.style).minHeight as number;
    expect(smHeight + 2 * (sm.props.hitSlop as number)).toBeGreaterThanOrEqual(44);
  });

  it('uses brand fill in light and dark themes', () => {
    const { unmount } = renderWithTheme(<Button label="Go" onPress={() => {}} />);
    expect(StyleSheet.flatten(screen.getByRole('button').props.style).backgroundColor).toBe(lightColors.brand.primary);
    unmount();
    renderWithTheme(<Button label="Go" variant="secondary" onPress={() => {}} />, { scheme: 'dark' });
    expect(StyleSheet.flatten(screen.getByRole('button').props.style).backgroundColor).toBe(darkColors.surface.primary);
  });
});

describe('IconButton', () => {
  it('requires a label and exposes selected state', () => {
    renderWithTheme(<IconButton icon="filter" accessibilityLabel="Filter" selected onPress={() => {}} />);
    expect(screen.getByRole('button', { name: 'Filter' })).toBeSelected();
  });

  it('is 44×44', () => {
    renderWithTheme(<IconButton icon="edit" accessibilityLabel="Edit" onPress={() => {}} />);
    const style = StyleSheet.flatten(screen.getByRole('button', { name: 'Edit' }).props.style);
    expect(style.width).toBe(44);
    expect(style.height).toBe(44);
  });
});

describe('Input', () => {
  it('is labelled and reports its error to screen readers', () => {
    renderWithTheme(<Input label="Odometer" error="Must be at least 50 600 km" />);
    const input = screen.getByLabelText('Odometer');
    expect(input.props.accessibilityHint).toBe('Must be at least 50 600 km');
    expect(screen.getByText('Must be at least 50 600 km')).toBeOnTheScreen();
  });

  it('is not editable when disabled', () => {
    renderWithTheme(<Input label="Plate" disabled />);
    expect(screen.getByLabelText('Plate').props.editable).toBe(false);
  });
});

describe('Select', () => {
  const options = [
    { value: 'ai92', label: 'AI-92' },
    { value: 'ai95', label: 'AI-95' },
  ] as const;

  it('opens a sheet and reports the chosen option', () => {
    const onChange = jest.fn();
    renderWithTheme(<Select label="Fuel type" value="ai92" options={options} onChange={onChange} />);
    fireEvent.press(screen.getByRole('button', { name: 'Fuel type, AI-92' }));
    expect(screen.getByRole('radio', { name: 'AI-92' })).toBeSelected();
    fireEvent.press(screen.getByRole('radio', { name: 'AI-95' }));
    expect(onChange).toHaveBeenCalledWith('ai95');
  });

  it('shows the localized placeholder when empty', () => {
    renderWithTheme(<Select label="Fuel type" value={null} options={options} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Fuel type, Tanlang' })).toBeOnTheScreen();
  });
});

describe('SegmentedControl', () => {
  it('exposes a radio group with the selected option checked', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <SegmentedControl
        accessibilityLabel="Period"
        value="month"
        onChange={onChange}
        options={[
          { value: 'month', label: 'This month' },
          { value: 'year', label: '12 months' },
        ]}
      />,
    );
    expect(screen.getByRole('radio', { name: 'This month' })).toBeChecked();
    fireEvent.press(screen.getByRole('radio', { name: '12 months' }));
    expect(onChange).toHaveBeenCalledWith('year');
  });
});

describe('Chip', () => {
  it('exposes selection and fires onPress', () => {
    const onPress = jest.fn();
    renderWithTheme(<Chip label="Fuel" selected onPress={onPress} />);
    const chip = screen.getByRole('button', { name: 'Fuel' });
    expect(chip).toBeSelected();
    fireEvent.press(chip);
    expect(onPress).toHaveBeenCalled();
  });
});
