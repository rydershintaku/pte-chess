import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      Name: 'RandomName',
      Result: 'Win',
    },
    amount: '.009 ETH',
    Total: '+0.018 ETH',
  },
  {
    name: {
      Name: 'CopyAndPaste',
      Result: 'Win',
    },
    amount: '.000000003 ETH',
    Total: '+.000000006 ETH',
  },
  {
    name: {
      Name: 'Donut',
      Result: 'Win',
    },
    amount: '.00004 ETH',
    Total: '+.00008 ETH',
  },
  {
    name: {
      Name: 'RyanShin',
      Result: 'Loss',
    },
    amount: '1 ETH',
    Total: '-2 ETH',
  },
  {
    name: {
      Name: 'MartinButler',
      Result: 'Loss',
    },
    amount: '1 ETH',
    Total: '-2 ETH',
  },
];

const Example = () => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.Name', //access nested data with dot notation
        header: 'Opponent',
      },
      {
        accessorKey: 'name.Result',
        header: 'Result',
      },
      {
        accessorKey: 'amount', //normal accessorKey
        header: 'Amount Staked',
      },
      {
        accessorKey: 'Total', //normal accessorKey
        header: 'Total',
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MantineReactTable table={table} />;
};

export default Example;