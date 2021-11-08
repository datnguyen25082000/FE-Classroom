import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './CardClass.scss';
import { transformDateFormat } from '../../../helpers/time';
import { FiMoreHorizontal } from 'react-icons/fi';

export const CardClass: React.FC<ICardClass> = ({ classInfo, handleAction }) => {
  return (
    <div key={classInfo.course_id} className="card-class">
      <Card style={{ width: '18rem', height: '100%' }}>
        <Card.Img variant="top" src={classInfo.course_thumbnail} className="card-class__image" />
        <Card.Body className="card-class__body">
          <Card.Title>{classInfo.course_name}</Card.Title>
          <Card.Text className="card-class__create-date">
            Ngày tạo: {transformDateFormat(classInfo.course_createdate)}
          </Card.Text>
          <Button variant="primary" className="card-class__button" onClick={handleAction}>
            Vào lớp
          </Button>
        </Card.Body>
        <div className="card-class__more">
          <FiMoreHorizontal size={20} />
        </div>
      </Card>
    </div>
  );
};
