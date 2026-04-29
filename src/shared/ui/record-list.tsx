import { Text, View } from '@tarojs/components';
import Button from '@taroify/core/button';
import Cell from '@taroify/core/cell';
import Empty from '@taroify/core/empty';
import { ReactNode } from 'react';

interface RecordListItem {
  id: string;
  title: string;
  description?: string;
  actionLabel?: string;
}

interface RecordListProps {
  items: RecordListItem[];
  emptyText: string;
  onAction?: (id: string) => void;
  footer?: (item: RecordListItem) => ReactNode;
}

export function RecordList({
  items,
  emptyText,
  onAction,
  footer,
}: RecordListProps) {
  if (!items.length) {
    return (
      <View
        style={{
          padding: '20px 12px',
          borderRadius: '16px',
          backgroundColor: '#fffaf3',
        }}
      >
        <Empty>
          <Empty.Image />
          <Empty.Description>{emptyText}</Empty.Description>
        </Empty>
      </View>
    );
  }

  return (
    <View
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#fffaf3',
      }}
    >
      {items.map((item) => (
        <View key={item.id} style={{ borderBottom: '1px solid #f0e6d7' }}>
          <Cell title={item.title} brief={item.description} />
          {item.actionLabel && onAction ? (
            <View style={{ padding: '0 16px 16px' }}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => onAction(item.id)}
              >
                {item.actionLabel}
              </Button>
            </View>
          ) : null}
          {footer ? (
            <View style={{ padding: '0 16px 16px' }}>
              <Text style={{ fontSize: '12px', color: '#6f6457' }}>{footer(item)}</Text>
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
}
