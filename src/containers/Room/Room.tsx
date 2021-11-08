import React from 'react';
import { useParams } from 'react-router';

export const Room = () => {
  const { classId } = useParams<{ classId: string }>();

  return <div className="room">{classId ? classId : 'haha'}</div>;
};
