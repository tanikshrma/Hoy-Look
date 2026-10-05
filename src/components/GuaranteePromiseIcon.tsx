import React from 'react';
import { Handshake } from 'lucide-react';

interface GuaranteePromiseIconProps {
  className?: string;
}

export const GuaranteePromiseIcon: React.FC<GuaranteePromiseIconProps> = ({ className = '' }) => (
  <Handshake className={className} aria-hidden="true" />
);
