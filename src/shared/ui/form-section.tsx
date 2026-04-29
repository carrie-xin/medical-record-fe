import { Text, View } from '@tarojs/components';
import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <View
      style={{
        marginBottom: '16px',
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: '#fffaf3',
        boxShadow: '0 8px 24px rgba(90, 67, 35, 0.08)',
      }}
    >
      <Text
        style={{
          display: 'block',
          marginBottom: '12px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#2f2418',
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
