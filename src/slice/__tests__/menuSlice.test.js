import { menuSlice, menuItemClick, actionItemClick } from '../menuSlice';
import { MENU_ITEMS } from '@/constants';

describe('menu slice', () => {
  it('should handle initial state', () => {
    expect(menuSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      activeMenuItem: MENU_ITEMS.PENCIL,
      actionMenuItem: null,
    });
  });

  it('should handle menuItemClick', () => {
    const previousState = {
      activeMenuItem: MENU_ITEMS.PENCIL,
      actionMenuItem: null,
    };
    expect(
      menuSlice.reducer(previousState, menuItemClick(MENU_ITEMS.ERASER))
    ).toEqual({
      activeMenuItem: MENU_ITEMS.ERASER,
      actionMenuItem: null,
    });
  });

  it('should handle actionItemClick', () => {
    const previousState = {
      activeMenuItem: MENU_ITEMS.PENCIL,
      actionMenuItem: null,
    };
    expect(
      menuSlice.reducer(previousState, actionItemClick(MENU_ITEMS.UNDO))
    ).toEqual({
      activeMenuItem: MENU_ITEMS.PENCIL,
      actionMenuItem: MENU_ITEMS.UNDO,
    });
  });
});
