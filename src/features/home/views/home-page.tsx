import Taro from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { useEffect, useMemo, useState } from 'react';
import Button from '@taroify/core/button';
import Empty from '@taroify/core/empty';
import Tag from '@taroify/core/tag';
import { useAppStore } from '@/features/app-context/store';
import { getMedicalRecords } from '@/features/medical-record/api';
import { MedicalRecord } from '@/features/medical-record/types';

interface QuickAction {
  title: string;
  subtitle: string;
  tone: string;
  textColor: string;
  path?: string;
  pending?: boolean;
}

const quickActions: QuickAction[] = [
  {
    title: '家庭成员',
    subtitle: '管理当前家庭',
    tone: 'linear-gradient(180deg, #ffb7aa 0%, #ff8c78 100%)',
    textColor: '#ffffff',
    path: '/pages/family/index',
  },
  {
    title: '宝宝档案',
    subtitle: '切换当前宝宝',
    tone: 'linear-gradient(180deg, #ffd68c 0%, #ffb53f 100%)',
    textColor: '#ffffff',
    path: '/pages/baby/index',
  },
  {
    title: '添加生病记录',
    subtitle: '记录症状与护理',
    tone: 'linear-gradient(180deg, #79dacb 0%, #47bfae 100%)',
    textColor: '#ffffff',
    path: '/pages/medical-record/index',
  },
  {
    title: '添加就医记录',
    subtitle: '登记就诊信息',
    tone: 'linear-gradient(180deg, #8ecaff 0%, #5aa8f4 100%)',
    textColor: '#ffffff',
    path: '/pages/medical-record/index',
  },
  {
    title: '成长记录',
    subtitle: '即将接入',
    tone: 'linear-gradient(180deg, #f5f1ec 0%, #efe7dc 100%)',
    textColor: '#66584a',
    pending: true,
  },
];

function formatDateLabel(value?: string | null) {
  if (!value) {
    return '待补充时间';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function getRecordTag(record: MedicalRecord) {
  return record.chiefComplaint || record.diagnosis || '健康记录';
}

export function HomePageView() {
  const currentUserId = useAppStore((state) => state.currentUserId);
  const currentFamilyId = useAppStore((state) => state.currentFamilyId);
  const currentBabyId = useAppStore((state) => state.currentBabyId);
  const hydrated = useAppStore((state) => state.hydrated);
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    async function loadRecords() {
      if (!currentBabyId) {
        setRecords([]);
        return;
      }

      try {
        const data = await getMedicalRecords(currentBabyId);
        setRecords(data);
      } catch {
        Taro.showToast({ title: '病历加载失败', icon: 'none' });
      }
    }

    if (!hydrated) {
      return;
    }

    void loadRecords();
  }, [currentBabyId, hydrated]);

  const currentBabyName = useMemo(() => {
    return records[0]?.baby?.name || (currentBabyId ? `宝宝 ${currentBabyId.slice(0, 6)}` : '待选择宝宝');
  }, [currentBabyId, records]);

  const recentRecords = useMemo(() => records.slice(0, 4), [records]);

  const latestRecord = recentRecords[0];

  function navigate(path: string) {
    void Taro.navigateTo({ url: path });
  }

  function handleQuickAction(action: QuickAction) {
    if (action.pending) {
      Taro.showToast({ title: '成长记录功能规划中', icon: 'none' });
      return;
    }

    if (action.path) {
      navigate(action.path);
    }
  }

  return (
    <View
      style={{
        minHeight: '100vh',
        padding: '24px',
        paddingBottom: '40px',
        background:
          'linear-gradient(180deg, #fff6ea 0%, #fffaf5 24%, #fef8f1 100%)',
        boxSizing: 'border-box',
      }}
    >
      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '8px 0 18px',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: '0',
            right: '10px',
            width: '170px',
            height: '170px',
            borderRadius: '999px',
            background: 'radial-gradient(circle, rgba(255,210,155,0.9) 0%, rgba(255,244,226,0) 72%)',
          }}
        />
        <Text
          style={{
            display: 'block',
            position: 'relative',
            fontSize: '36px',
            fontWeight: '700',
            color: '#3a281d',
            letterSpacing: '1px',
          }}
        >
          宝宝健康档案
        </Text>
        <Text
          style={{
            display: 'block',
            position: 'relative',
            marginTop: '10px',
            fontSize: '20px',
            lineHeight: '30px',
            color: '#f09458',
            fontWeight: '600',
          }}
        >
          今天也要好好长大
        </Text>
        <Text
          style={{
            display: 'block',
            position: 'relative',
            marginTop: '8px',
            maxWidth: '78%',
            fontSize: '14px',
            lineHeight: '22px',
            color: '#7c6e60',
          }}
        >
          围绕当前宝宝查看症状、病历与提醒，保持家庭健康记录连续可查。
        </Text>
      </View>

      <View
        style={{
          marginTop: '10px',
          padding: '18px 20px',
          borderRadius: '28px',
          backgroundColor: '#fffdf9',
          border: '2px solid #ffb196',
          boxShadow: '0 16px 36px rgba(200, 148, 92, 0.12)',
        }}
        onClick={() => Taro.switchTab({ url: '/pages/health/index' })}
      >
        <View style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <View
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '999px',
              background: 'linear-gradient(180deg, #ffaf95 0%, #ff8d73 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '30px',
              fontWeight: '700',
              flexShrink: 0,
            }}
          >
            搜
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                display: 'block',
                fontSize: '24px',
                fontWeight: '700',
                color: '#2d2118',
              }}
            >
              搜索症状 / 病历记录
            </Text>
            <Text
              style={{
                display: 'block',
                marginTop: '6px',
                fontSize: '15px',
                lineHeight: '22px',
                color: '#9e9287',
              }}
            >
              咳嗽、发烧、湿疹、过敏
            </Text>
          </View>
          <Button color="primary" size="small" style={{ borderRadius: '999px', padding: '0 14px' }}>
            搜索
          </Button>
        </View>
      </View>

      <View
        style={{
          marginTop: '20px',
          padding: '22px',
          borderRadius: '28px',
          backgroundColor: '#fffdf9',
          boxShadow: '0 16px 36px rgba(153, 113, 74, 0.1)',
        }}
      >
        <View style={{ display: 'flex', justifyContent: 'space-between', gap: '14px' }}>
          <View style={{ display: 'flex', gap: '16px', flex: 1 }}>
            <View
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '999px',
                background: 'linear-gradient(180deg, #ffe4d8 0%, #ffd1bf 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8b5a3c',
                fontSize: '28px',
                fontWeight: '700',
                flexShrink: 0,
              }}
            >
              宝
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  display: 'block',
                  fontSize: '30px',
                  fontWeight: '700',
                  color: '#2d2118',
                }}
              >
                {currentBabyName}
              </Text>
              <Text
                style={{
                  display: 'block',
                  marginTop: '8px',
                  fontSize: '15px',
                  color: '#8c8074',
                }}
              >
                {hydrated && currentBabyId ? '当前宝宝已关联病历记录' : '请先在宝宝档案中选择当前宝宝'}
              </Text>
              <View style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                <Tag color="primary" variant="outlined">
                  family: {hydrated ? currentFamilyId || '未设置' : '加载中'}
                </Tag>
                <Tag color="success" variant="outlined">
                  user: {hydrated ? currentUserId || '未设置' : '加载中'}
                </Tag>
              </View>
            </View>
          </View>

          <Button
            size="small"
            variant="outlined"
            color="primary"
            style={{ alignSelf: 'flex-start', borderRadius: '999px' }}
            onClick={() => navigate('/pages/baby/index')}
          >
            切换宝宝
          </Button>
        </View>

        <View
          style={{
            marginTop: '18px',
            padding: '14px 16px',
            borderRadius: '18px',
            background: 'linear-gradient(180deg, #f7fffc 0%, #f1fcf8 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <Text style={{ fontSize: '15px', color: '#4e9d8b', lineHeight: '24px' }}>
            最近记录：{latestRecord ? getRecordTag(latestRecord) : '暂无病历'}
          </Text>
          <Text style={{ fontSize: '15px', color: '#23a58d', lineHeight: '24px', fontWeight: '600' }}>
            {latestRecord ? formatDateLabel(latestRecord.visitDate) : '等待添加'}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: '20px',
          padding: '18px',
          borderRadius: '28px',
          backgroundColor: '#fffdf9',
          boxShadow: '0 16px 36px rgba(153, 113, 74, 0.08)',
        }}
      >
        <View
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '14px',
          }}
        >
          {quickActions.map((action) => (
            <View
              key={action.title}
              style={{
                padding: '16px',
                minHeight: '114px',
                borderRadius: '22px',
                background: action.tone,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onClick={() => handleQuickAction(action)}
            >
              <Text
                style={{
                  display: 'block',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: action.textColor,
                }}
              >
                {action.title}
              </Text>
              <Text
                style={{
                  display: 'block',
                  marginTop: '8px',
                  fontSize: '13px',
                  lineHeight: '20px',
                  color: action.textColor,
                  opacity: 0.9,
                }}
              >
                {action.subtitle}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          marginTop: '20px',
          padding: '20px',
          borderRadius: '28px',
          backgroundColor: '#fffdf9',
          boxShadow: '0 16px 36px rgba(153, 113, 74, 0.08)',
        }}
      >
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <Text style={{ fontSize: '24px', fontWeight: '700', color: '#2d2118' }}>最近记录</Text>
          <Text
            style={{ fontSize: '15px', color: '#8d8378' }}
            onClick={() => navigate('/pages/medical-record/index')}
          >
            查看全部
          </Text>
        </View>

        {recentRecords.length ? (
          <View>
            {recentRecords.map((record, index) => (
              <View
                key={record.id}
                style={{
                  padding: '16px 0',
                  borderBottom: index === recentRecords.length - 1 ? 'none' : '1px solid #f4e9dc',
                }}
                onClick={() => navigate('/pages/medical-record/index')}
              >
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        display: 'block',
                        fontSize: '22px',
                        fontWeight: '600',
                        color: '#2d2118',
                      }}
                    >
                      {record.hospitalName || '就医记录'}
                    </Text>
                    <Text
                      style={{
                        display: 'block',
                        marginTop: '6px',
                        fontSize: '14px',
                        lineHeight: '22px',
                        color: '#8f8378',
                      }}
                    >
                      {formatDateLabel(record.visitDate)}
                      {record.departmentName ? ` · ${record.departmentName}` : ''}
                    </Text>
                  </View>
                  <Tag color="danger" variant="contained">
                    {getRecordTag(record)}
                  </Tag>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View
            style={{
              padding: '18px 0 6px',
              borderRadius: '20px',
              backgroundColor: '#fffaf3',
            }}
          >
            <Empty>
              <Empty.Image />
              <Empty.Description>当前宝宝还没有病历记录</Empty.Description>
            </Empty>
            <View style={{ padding: '0 16px 12px' }}>
              <Button block color="primary" onClick={() => navigate('/pages/medical-record/index')}>
                去添加第一条记录
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

export default HomePageView;
