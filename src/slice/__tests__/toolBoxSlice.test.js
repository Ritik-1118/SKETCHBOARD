import { toolboxSlice, changeColor, changeBrushSize } from '../toolBoxSlice';
import { MENU_ITEMS, COLORS } from '@/constants';

describe('toolbox slice', () => {
  const initialState = {
    [MENU_ITEMS.PENCIL]: {
      color: COLORS.BLACK,
      size: 3,
    },
    [MENU_ITEMS.ERASER]: {
      color: COLORS.WHITE,
      size: 3,
    },
    [MENU_ITEMS.UNDO]: {},
    [MENU_ITEMS.REDO]: {},
    [MENU_ITEMS.DOWNLOAD]: {},
  };

  it('should handle initial state', () => {
    expect(toolboxSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle changeColor', () => {
    const previousState = initialState;
    expect(
      toolboxSlice.reducer(
        previousState,
        changeColor({ item: MENU_ITEMS.PENCIL, color: COLORS.RED })
      )
    ).toEqual({
      ...initialState,
      [MENU_ITEMS.PENCIL]: {
        ...initialState[MENU_ITEMS.PENCIL],
        color: COLORS.RED,
      },
    });
  });

  it('should handle changeBrushSize', () => {
    const previousState = initialState;
    expect(
      toolboxSlice.reducer(
        previousState,
        changeBrushSize({ item: MENU_ITEMS.PENCIL, size: 5 })
      )
    ).toEqual({
      ...initialState,
      [MENU_ITEMS.PENCIL]: {
        ...initialState[MENU_ITEMS.PENCIL],
        size: 5,
      },
    });
  });
});
