import React from 'react';
import DocSidebarMobile from '@theme-original/DocSidebar/Mobile';
import type DocSidebarMobileType from '@theme/DocSidebar/Mobile';
import type {WrapperProps} from '@docusaurus/types';
import SidebarSwitcher from '@site/src/components/SidebarSwitcher';

type Props = WrapperProps<typeof DocSidebarMobileType>;

export default function DocSidebarMobileWrapper(props: Props): React.ReactElement {
  const sidebarId = 'sidebarId' in props ? (props as unknown as {sidebarId: string}).sidebarId : undefined;
  return (
    <>
      <SidebarSwitcher currentSidebarId={sidebarId} />
      <DocSidebarMobile {...props} />
    </>
  );
}
