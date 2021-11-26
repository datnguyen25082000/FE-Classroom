import React, { FC, memo, useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "../Card/Card";
import update from "immutability-helper";

export const DDContainer: FC<IDDContainer> = memo(function Container({
  ITEMS,
}) {
  const [cards, setCards] = useState(ITEMS);

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c: any) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );

  const [, drop] = useDrop(() => ({ accept: "card" }));

  return (
    <div ref={drop}>
      {cards.map((card: any) => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          value={card.value}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </div>
  );
});
