import { Text, View } from '@tarojs/components';
import { ReactNode } from 'react';
import NoticeBar from '@taroify/core/notice-bar';
import Tag from '@taroify/core/tag';

interface PageLayoutProps {
  title: string;
  description: string;
  contextLabel?: string;
  contextValue?: string | null;
  hydrated?: boolean;
  children: ReactNode;
}

export function PageLayout({
  title,
  description,
  contextLabel,
  contextValue,
  hydrated = true,
  children,
}: PageLayoutProps) {
  return (
    <View
      style={{
        minHeight: '100vh',
        padding: '24px',
        backgroundColor: '#f5efe6',
      }}
    >
      <View style={{ marginBottom: '20px' }}>
        <Text
          style={{
            display: 'block',
            fontSize: '28px',
            fontWeight: '700',
            color: '#2f2418',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            display: 'block',
            marginTop: '6px',
            fontSize: '14px',
            lineHeight: '22px',
            color: '#6f6457',
          }}
        >
          {description}
        </Text>
      </View>

      {contextLabel ? (
        <View style={{ marginBottom: '16px' }}>
          <Tag color="warning" variant="contained" size="medium">
            {contextLabel}: {hydrated ? contextValue || 'not set' : 'loading...'}
          </Tag>
        </View>
      ) : null}

      <NoticeBar
        style={{
          marginBottom: '16px',
          borderRadius: '12px',
          background: '#fff8e8',
          color: '#7a5318',
        }}
        scrollable={false}
        wordwrap
      >
        This page is using Taroify for UI consistency and Zod for form validation.
      </NoticeBar>

      {children}
    </View>
  );
}
