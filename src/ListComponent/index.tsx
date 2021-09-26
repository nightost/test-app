import React from 'react';

export type ListComponent = <ListItem>({ items, render }: {
  items: ListItem[];
  render: (item: ListItem) => React.ReactNode;
}) => React.ReactNode

export const List: ListComponent = ({items, render}) => {
  return (
    <div>
      {
        items.map(item => render(item))
      }
    </div>
  )
}