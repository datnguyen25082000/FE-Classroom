import React from 'react';
import { Collapse, Card, Button } from 'react-bootstrap';

export const CollapseOption: React.FC<IModalAddCourse> = ({ show, setShow, children }) => {
  return (
    <>
      <Button
        onClick={() => setShow(!show)}
        aria-controls="example-collapse-text"
        aria-expanded={show}
      >
        Click
      </Button>
      <div style={{ minHeight: '150px' }}>
        <Collapse in={show} dimension="width">
          <div id="example-collapse-text">
            <Card body style={{ width: '400px' }}>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
              sapiente ea proident.
            </Card>
          </div>
        </Collapse>
      </div>
    </>
  );
};
