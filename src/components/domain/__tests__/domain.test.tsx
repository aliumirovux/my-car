import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '@/test/render';

import { DocumentRow, ExpenseRow, MaintenanceRow, VehicleCard, documentStatusTone, maintenanceStatusTone } from '..';

describe('status tones', () => {
  it('maps business-rule statuses to tones', () => {
    expect(maintenanceStatusTone).toEqual({ overdue: 'error', due_soon: 'warning', ok: 'success' });
    expect(documentStatusTone.expired).toBe('error');
    expect(documentStatusTone.expires_soon).toBe('warning');
    expect(documentStatusTone.no_expiry).toBe('neutral');
  });
});

describe('domain rows', () => {
  it('VehicleCard reads name, details, odometer and status', () => {
    const onPress = jest.fn();
    renderWithTheme(
      <VehicleCard name="Chevrolet Cobalt" details="2021 · 01 A 123 BC" odometer="51 200 km" status={{ tone: 'success', label: 'All good' }} selected onPress={onPress} />,
    );
    const card = screen.getByRole('button', { name: 'Chevrolet Cobalt, 2021 · 01 A 123 BC, 51 200 km, All good' });
    expect(card).toBeSelected();
    fireEvent.press(card);
    expect(onPress).toHaveBeenCalled();
  });

  it('ExpenseRow reads title, subtitle and amount', () => {
    renderWithTheme(<ExpenseRow icon="fuel" title="Fuel · AI-92" subtitle="20.09.2026 · 25 L" amount="262 500 soʻm" onPress={() => {}} />);
    expect(screen.getByRole('button', { name: 'Fuel · AI-92, 20.09.2026 · 25 L, 262 500 soʻm' })).toBeOnTheScreen();
  });

  it('MaintenanceRow includes status text and progress', () => {
    renderWithTheme(<MaintenanceRow title="Oil" dueText="In 3 800 km" status="due_soon" statusLabel="Due soon" progress={0.9} onPress={() => {}} />);
    expect(screen.getByRole('button', { name: 'Oil, Due soon, In 3 800 km' })).toBeOnTheScreen();
    expect(screen.getByRole('progressbar')).toHaveAccessibilityValue({ now: 90 });
  });

  it('DocumentRow hides the badge for replaced documents (DOC-6)', () => {
    const { rerender } = renderWithTheme(<DocumentRow title="OSAGO" status="expires_soon" statusLabel="Expires soon" onPress={() => {}} />);
    expect(screen.getByText('Expires soon')).toBeOnTheScreen();
    rerender(<DocumentRow title="OSAGO" status="replaced" statusLabel="Replaced" onPress={() => {}} />);
    expect(screen.queryByText('Replaced')).toBeNull();
  });
});
