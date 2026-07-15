import { ReactNode, useMemo, useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiFileText, FiShoppingBag, FiUserPlus } from 'react-icons/fi';

import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Empty } from 'antd';

// ─── Types ──────────────────────────────────────────────────────────────────
type NotificationType = 'vendor' | 'agent' | 'request' | 'report' | 'alert';

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
}

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

// ─── Static data ──────────────────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'vendor',
    title: 'New vendor awaiting approval',
    body: 'Bloom Florist submitted onboarding documents for review.',
    time: '2 minutes ago',
    isRead: false,
  },
  {
    id: 'n2',
    type: 'request',
    title: 'Request escalated',
    body: 'Delivery request #4821 in Lahore has been escalated to your team.',
    time: '25 minutes ago',
    isRead: false,
  },
  {
    id: 'n3',
    type: 'agent',
    title: 'New sales agent added',
    body: 'Ali Raza was added to the Karachi region by Sara Ahmed.',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: 'n4',
    type: 'report',
    title: 'Weekly performance digest ready',
    body: 'Your weekly analytics report for June is now available.',
    time: 'Yesterday, 6:30 PM',
    isRead: true,
  },
  {
    id: 'n5',
    type: 'alert',
    title: 'City expansion alert',
    body: 'Vendor coverage in Islamabad dropped below the 80% target.',
    time: 'Yesterday, 2:15 PM',
    isRead: true,
  },
  {
    id: 'n6',
    type: 'vendor',
    title: 'Vendor verification completed',
    body: 'Green Grocery has been successfully verified and activated.',
    time: '2 days ago',
    isRead: true,
  },
];

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Unread', value: 'unread' },
] as const;

type TabValue = (typeof TABS)[number]['value'];

// ─── Type → icon mapping ──────────────────────────────────────────────────────
const TYPE_ICON: Record<NotificationType, { icon: ReactNode; className: string }> = {
  vendor: { icon: <FiShoppingBag size={16} />, className: 'text-primary bg-primary/10' },
  agent: { icon: <FiUserPlus size={16} />, className: 'text-info bg-info/10' },
  request: { icon: <FiFileText size={16} />, className: 'text-warning bg-warning/10' },
  report: { icon: <FiCheckCircle size={16} />, className: 'text-success bg-success/10' },
  alert: { icon: <FiAlertTriangle size={16} />, className: 'text-danger bg-danger/10' },
};

// ─── Main component ───────────────────────────────────────────────────────────
function NotificationDrawer({ open, onClose }: NotificationDrawerProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<TabValue>('all');

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);
  const visibleNotifications = useMemo(
    () => (activeTab === 'unread' ? notifications.filter((n) => !n.isRead) : notifications),
    [notifications, activeTab]
  );

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      size={460}
      closable={false}
      mask
      maskClassName='backdrop-blur-[10px]'
      className='[&_.ant-drawer-body]:p-0 [&_.ant-drawer-header]:hidden bg-white'
    >
      <div className='flex flex-col h-full'>
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className='flex items-center justify-between gap-3 py-5 px-6 border-b border-border'>
          <div className='flex flex-col gap-0.5'>
            <h2 className='font-semibold text-base text-text-primary'>Notifications</h2>
            <p className='text-sm text-text-secondary'>{unreadCount} unread</p>
          </div>
          <Button
            type='text'
            variant='filled'
            onClick={onClose}
            className='flex items-center justify-center p-0 h-7 w-7'
          >
            <CloseOutlined className='text-text-secondary text-sm' />
          </Button>
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────────── */}
        <div className='px-6 pt-4'>
          <div className='flex items-center gap-1.5 bg-background p-1 rounded-lg'>
            {TABS.map((tab) => (
              <button
                key={tab.value}
                type='button'
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 py-1.5 text-center cursor-pointer rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.value ? 'text-text-primary bg-white shadow-sm' : 'text-text-secondary'
                }`}
              >
                {tab.label}
                {tab.value === 'unread' && ` (${unreadCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* ── List ────────────────────────────────────────────────────────── */}
        <div className='flex-1 overflow-y-auto px-6 py-4 space-y-2.5'>
          {visibleNotifications.length === 0 ? (
            <div className='flex-centered h-full'>
              <Empty description='No notifications' />
            </div>
          ) : (
            visibleNotifications.map((notification) => {
              const { icon, className } = TYPE_ICON[notification.type];
              return (
                <div
                  key={notification.id}
                  role='button'
                  onClick={() => markAsRead(notification.id)}
                  className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                    notification.isRead
                      ? 'bg-white border-card-border hover:bg-background'
                      : 'bg-background-hover border-primary/30'
                  }`}
                >
                  <div className='flex items-start gap-3'>
                    <div className={`flex-centered shrink-0 w-9 h-9 rounded-full ${className}`}>{icon}</div>
                    <div className='flex-1 min-w-0'>
                      <p className='font-medium text-sm text-text-primary mb-0.5'>{notification.title}</p>
                      <p className='text-sm text-text-secondary mb-1'>{notification.body}</p>
                      <p className='text-xs text-text-secondary'>{notification.time}</p>
                    </div>
                    {!notification.isRead && <span className='shrink-0 mt-1.5 w-2.5 h-2.5 rounded-full bg-primary' />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className='px-6 py-4 border-t border-border'>
          <Button
            type='default'
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className='w-full h-11 bg-background! rounded-lg'
          >
            Mark all as read
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default NotificationDrawer;
