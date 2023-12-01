import {Store} from 'pullstate';

export interface FilterStore {
  american: boolean;
  chinese: boolean;
  japanese: boolean;
  indian: boolean;
  italian: boolean;
  turkish: boolean;
  fastfood: boolean;
}

export const FilterStore = new Store<FilterStore>({
  american: false,
  chinese: false,
  japanese: false,
  indian: false,
  italian: false,
  turkish: false,
  fastfood: false,
});
