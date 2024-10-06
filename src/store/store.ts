import { reactive } from 'vue';

import type { IData } from '@/types/types';

export const store: IData = reactive({
  data: null,
  activeFilterIndex: 0,
});
