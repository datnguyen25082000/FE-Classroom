import { CSSProperties, FC, memo, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import "./Card.scss";
import { useForm } from "react-hook-form";
import { ModalConfirm } from "../../";

export interface CardProps {
  id: string;
  text: string;
  value: any;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
}

interface Item {
  id: string;
  originalIndex: number;
}

export const Card: FC<CardProps> = memo(function Card({
  id,
  text,
  value,
  moveCard,
  findCard,
}) {
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "card",
      canDrop: () => false,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;

  //
  const [showAddCard, setShowAddCard] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setShowAddCard(false);
  };

  const handleClickEdit = () => {
    setShowAddCard(!showAddCard);
  };

  const handleClickRemove = () => {
    setShowModalConfirm(true);
  };

  const handleDeleteItem = () => {};

  return (
    <div
      className="dd-card"
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
    >
      <div className="dd-card__groupBtn">
        <Button
          variant={showAddCard ? "secondary" : "primary"}
          style={{ marginRight: 10 }}
          onClick={handleClickEdit}
        >
          {showAddCard ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
        </Button>
        <Button variant="danger" onClick={handleClickRemove}>
          Xóa
        </Button>
      </div>

      {!showAddCard ? (
        <>
          <p className="dd-card__title">{text}</p>
          <p className="dd-card__value">{value}</p>
        </>
      ) : (
        <>
          <p className="grading-structure__add-title">
            Chỉnh sửa thông tin cột điểm
          </p>
          <FloatingLabel controlId="floatingInputGrid" label="Tên cột điểm">
            <Form.Control
              type="text"
              defaultValue={text}
              style={{ marginTop: 40 }}
              placeholder=""
              {...register("col_name", {
                required: "Vui lòng nhập cột điểm",
                maxLength: 40,
              })}
              isInvalid={!!errors.col_name}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInputGrid"
            label="Số điểm"
            style={{ marginTop: 15, marginBottom: 20 }}
          >
            <Form.Control
              type="number"
              defaultValue={value}
              placeholder=""
              {...register("col_value", {
                required: "Vui lòng nhập số điểm",
                maxLength: 40,
              })}
              isInvalid={!!errors.col_value}
            />
          </FloatingLabel>
          <Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
            Cập nhật
          </Button>
        </>
      )}

      <ModalConfirm
        show={showModalConfirm}
        handleClose={() => setShowModalConfirm(false)}
        handleAction={handleDeleteItem}
        title="Xóa cột điểm"
      >
        <p>Bạn muốn xóa cột điểm {text}?</p>
      </ModalConfirm>
    </div>
  );
});
