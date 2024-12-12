export interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  colToSearch?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
}
