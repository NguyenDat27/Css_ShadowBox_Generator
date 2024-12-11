import createStore from 'teaful';
import { produce } from 'immer';

/**
 * @typedef {Object} BoxShadow
 * @property {string} color
 * @property {number} opacity
 * @property {number} horizontal
 * @property {number} vertical
 * @property {number} blur
 * @property {number} spread
 * @property {boolean} inset
 */

/**
 * @typedef {Object} State
 * @property {BoxShadow[]} boxShadows
 * @property {number | null} selectedIndex
 */

const { useStore } = createStore({
  boxShadows: [
    {
      color: '0,0,0',
      opacity: 0.2,
      horizontal: 0,
      vertical: 0,
      blur: 5,
      spread: 3,
      inset: false,
    }
  ],
  selectedIndex: 0,
});

// Tạo store với các state mặc định
export const useBoxShadowStore = () => {
  return useStore();
};

/**
 * Hàm cập nhật state
 * @param {function((state: State) => void): void} setState
 * @param {number} index
 * @param {keyof BoxShadow} field
 * @param {*} value
 */
export const updateState = (setState, index, field, value) => {
  setState(produce(draft => {
    draft.boxShadows[index][field] = value;
  }));
};

/**
 * Thêm Box Shadow mới
 * @param {function((state: State) => void): void} setState
 */
export const addBoxShadow = (setState) => {
  setState(produce(draft => {
    draft.boxShadows.push({
      color: '0,0,0',
      opacity: 0.2,
      horizontal: 0,
      vertical: 0,
      blur: 5,
      spread: 3,
      inset: false,
    });
    draft.selectedIndex = draft.boxShadows.length - 1;
  }));
};

/**
 * Chọn box shadow để chỉnh sửa
 * @param {function((state: State) => void): void} setState
 * @param {number} index
 */
export const selectBoxShadow = (setState, index) => {
  setState(produce(draft => {
    draft.selectedIndex = index;
  }));
};

/**
 * Xóa box shadow
 * @param {function((state: State) => void): void} setState
 * @param {number} index
 */
export const deleteBoxShadow = (setState, index) => {
  setState(produce(draft => {
    if (draft.boxShadows.length === 1) {
      return;
    }
    draft.boxShadows.splice(index, 1);

    // Cập nhật selectedIndex
    if (draft.selectedIndex === index) {
      if (draft.boxShadows.length > 0) {
        draft.selectedIndex = index < draft.boxShadows.length ? index : index - 1;
      } else {
        draft.selectedIndex = null;
      }
    }
  }));
};

/**
 * Di chuyển lớp
 * @param {function((state: State) => void): void} setState
 * @param {number} fromIndex
 * @param {number} toIndex
 */
export const moveLayer = (setState, fromIndex, toIndex) => {
  if (fromIndex === toIndex) return;

  setState(produce(draft => {
    const [movedItem] = draft.boxShadows.splice(fromIndex, 1);
    draft.boxShadows.splice(toIndex, 0, movedItem);
  }));
};

/**
 * Áp dụng mẫu
 * @param {function((state: State) => void): void} setState
 * @param {BoxShadow[]} template
 */
export const applyTemplate = (setState, template) => {
  setState(produce(draft => {
    const boxShadows = template.map(shadow => ({
      color: shadow.color,
      opacity: shadow.opacity,
      horizontal: shadow.horizontal,
      vertical: shadow.vertical,
      blur: shadow.blur,
      spread: shadow.spread,
      inset: shadow.inset,
    }));

    draft.boxShadows = boxShadows;
    draft.selectedIndex = 0;
  }));
};
