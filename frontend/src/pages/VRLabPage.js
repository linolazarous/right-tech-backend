import React, { Suspense, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import PageLayout from '../layouts/PageLayout.js';
import VRDeviceChecker from '../components/vr/VRDeviceChecker.js';
import VRErrorBoundary from '../components/vr/VRErrorBoundary.js';
import VRLoading from '../components/vr/VRLoading.js';
import { logger } from '../utils/logger.js';
import { usePageTracking } from '../hooks/usePageTracking.js';

const VRLabComponent = React.lazy(() => import('../components/vr/VRLabComponent.js'));

const VRLabPage = () => {
  const { currentUser } = useAuth();
  const [deviceStatus, setDeviceStatus] = useState({
    isSupported: false,
    isMobile: false,
    requiresCardboard: false
  });
  usePageTracking();

  useEffect(() => {
    logger.info('VR Lab accessed', {
      userId: currentUser?.id,
      deviceStatus
    });
  }, [currentUser?.id, deviceStatus]);

  return (
    <PageLayout 
      title="VR Lab" 
      protectedRoute 
      className="bg-black text-white"
      seoTitle="VR Learning Lab | Right Tech Centre"
      seoDescription="Immersive virtual reality learning environment"
    >
      <VRDeviceChecker onCheck={setDeviceStatus} />
      
      {!deviceStatus.isSupported ? (
        <DeviceNotSupported status={deviceStatus} />
      ) : (
        <VRErrorBoundary>
          <Suspense fallback={<VRLoading />}>
            <VRLabComponent 
              userId={currentUser?.id}
              deviceStatus={deviceStatus}
            />
          </Suspense>
        </VRErrorBoundary>
      )}
    </PageLayout>
  );
};

const DeviceNotSupported = ({ status }) => (
  <div className="text-center p-8">
    <h2 className="text-xl font-bold mb-4">
      {status.isMobile ? 'Mobile VR Required' : 'VR Not Supported'}
    </h2>
    {status.isMobile && !status.requiresCardboard && (
      <div className="space-y-4">
        <p>For the best experience, use:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>A VR headset (Oculus, HTC Vive, etc.)</li>
          <li>Google Cardboard with a compatible smartphone</li>
        </ul>
      </div>
    )}
    {!status.isMobile && (
      <p>Your device doesn't support VR features. Try accessing from a compatible mobile device.</p>
    )}
  </div>
);

export default React.memo(VRLabPage);

