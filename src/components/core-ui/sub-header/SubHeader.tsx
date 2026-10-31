import type { ReactNode } from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { Button } from 'antd';

import useBack from 'hooks/use-back';

interface SubHeaderProps {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
  primaryButton?: string;
  secondaryButton?: string;
  showBackBtn?: boolean;
  primaryButtonIcon?: ReactNode;
  secondaryButtonIcon?: ReactNode;
  className?: string;
  onPrimaryBtnClick?: () => void;
  onBackBtnClick?: () => void;
  onSecondaryBtnClick?: () => void;
}

const SubHeader = (props: SubHeaderProps) => {
  const {
    title,
    subTitle,
    primaryButton = '',
    onPrimaryBtnClick,
    onSecondaryBtnClick,
    showBackBtn,
    secondaryButton = '',
    onBackBtnClick,
    primaryButtonIcon = <></>,
    secondaryButtonIcon = <></>,
  } = props;
  const { handleBack } = useBack();
  return (
    <div className='flex justify-between items-center flex-wrap gap-4'>
      <div className='flex gap-x-2.5 items-center'>
        {showBackBtn && (
          <Button
            onClick={() => {
              handleBack();
              onBackBtnClick?.();
            }}
            className='
              flex items-center justify-center rounded-sm
              w-6.5 h-6.5 p-0 bg-surface
              hover:bg-surface-hover transition-colors
            '
          >
            <MdOutlineArrowBackIos className='text-text-primary' />
          </Button>
        )}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold'>{title}</h3>
          {subTitle && <p className='font-normal text-sm text-icon-primary'>{subTitle}</p>}
        </div>
      </div>
      {(primaryButton || secondaryButton) && (
        <div className='flex items-center gap-2.5'>
          {secondaryButton && (
            <Button
              onClick={onSecondaryBtnClick}
              icon={secondaryButtonIcon}
              type='default'
              variant='text'
              className='h-11! bg-background! border-primary! text-primary! w-fit! gap-2.5!'
            >
              {secondaryButton}
            </Button>
          )}
          {primaryButton && (
            <Button
              onClick={onPrimaryBtnClick}
              icon={primaryButtonIcon}
              type='primary'
              className='h-11! w-fit gap-2.5!'
            >
              {primaryButton}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SubHeader;
