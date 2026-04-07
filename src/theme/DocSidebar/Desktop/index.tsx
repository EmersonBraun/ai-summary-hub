import React from 'react';
import DocSidebarDesktop from '@theme-original/DocSidebar/Desktop';
import type DocSidebarDesktopType from '@theme/DocSidebar/Desktop';
import type {WrapperProps} from '@docusaurus/types';
import SidebarSwitcher from '@site/src/components/SidebarSwitcher';

import styles from './styles.module.css';

type Props = WrapperProps<typeof DocSidebarDesktopType>;

export default function DocSidebarDesktopWrapper(props: Props): React.ReactElement {
  const sidebarId = 'sidebarId' in props ? (props as unknown as {sidebarId: string}).sidebarId : undefined;
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <SidebarSwitcher currentSidebarId={sidebarId} />
      <div className={styles.scrollWrap}>
        <DocSidebarDesktop {...props} />
      </div>
    </div>
  );
}
