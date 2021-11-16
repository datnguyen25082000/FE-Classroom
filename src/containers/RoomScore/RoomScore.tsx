import React, { useState } from "react";
import { useParams } from "react-router";
import { HeaderRoom } from "../../components/common";
import { OffCanvas } from "../../components";

export const RoomScore = () => {
  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <div className="room-score">
      <HeaderRoom classId={classId} handleAction1={() => setShowCanvas(true)} />

      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />
    </div>
  );
};
