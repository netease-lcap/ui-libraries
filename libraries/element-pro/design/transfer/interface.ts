import {
  DataOption, TransferValue, TransferListType, SearchContext, ElTransferProps,
} from './type';

export * from './type';

export type TransferProps = ElTransferProps;

export interface TransferItemOption {
  label: string;
  value: TransferValue;
  disabled: boolean;
  key: string;
  data: DataOption;
  children?: TransferItemOption[];
}

export type TransferListOptionBase<T> = {
  [type in TransferListType]: T;
};

export type SearchEvent = SearchContext;
