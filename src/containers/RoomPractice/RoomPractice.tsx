import React, { useState } from "react";
import { useParams } from "react-router";
import { HeaderRoom } from "../../components/common";
import { OffCanvas } from "../../components";

export const RoomPractice = () => {
  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <div className="room-practice">
      <HeaderRoom classId={classId} handleAction1={() => setShowCanvas(true)} />

      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />
    </div>
  );
};
