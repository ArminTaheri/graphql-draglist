// @flow

import * as R from "ramda";
import React from "react";
import type { Node } from "react";
import classnames from "classnames";
import {
  useDragReleaseEffect,
  usePickItemEffect,
  usePickInsertionSlotEffect
} from "./hooks";

import styles from "./styles.scss";

type ListItem = { content: any };

type Insertion = {
  index: number,
  item: ListItem,
  slider: {
    height: number,
    top0: number,
    deltaY: number
  }
};

type DragListProps = {
  list: ListItem[],
  setList: (ListItem[]) => void,
  insertion?: Insertion,
  setInsertion: (?Insertion) => any,
  renderItem: (ListItem, ?number) => Node,
  spacing: number
};

const InsertionSlot = ({ index, list, insertion, setInsertion, spacing }) => {
  const pickInsertionSlotEffectRef = usePickInsertionSlotEffect(
    index,
    list,
    insertion,
    setInsertion
  );

  return (
    <div
      ref={pickInsertionSlotEffectRef}
      style={{
        height:
          (insertion ? 2 : 1) * spacing +
          (insertion && insertion.index === index ? insertion.slider.height : 0)
      }}
      className={styles.insertionSlot}
    />
  );
};

const DragListItem = ({ index, list, insertion, setInsertion, children }) => {
  const pickItemEffectRef = usePickItemEffect(
    index,
    list,
    insertion,
    setInsertion
  );

  return (
    <div ref={pickItemEffectRef} className={styles.element}>
      {children}
    </div>
  );
};

const DragList = ({
  list,
  setList,
  insertion,
  setInsertion,
  renderItem,
  spacing
}: DragListProps) => {
  const filteredList = insertion
    ? list.filter(item => !R.equals(insertion.item, item))
    : list;

  const slidingElement = insertion ? renderItem(insertion.item, 0) : null;

  const topFromInsertion = insertion => {
    const { top0, deltaY } = insertion.slider;
    return top0 + deltaY;
  };

  const dragReleaseEffectRef = useDragReleaseEffect(insertion, setInsertion);

  return (
    <div ref={dragReleaseEffectRef} className={styles.dragList}>
      <div className={styles.slider}>
        {insertion && (
          <div
            style={{ top: topFromInsertion(insertion) }}
            className={classnames(styles.slidingElement, {
              visible: !!insertion
            })}
          >
            {slidingElement}
          </div>
        )}
      </div>
      <div className={styles.elements}>
        <InsertionSlot
          index={0}
          insertion={insertion}
          setInsertion={setInsertion}
          list={filteredList}
          setList={setList}
          spacing={spacing}
        />
        {filteredList.map((item, i) => {
          return (
            <div key={i}>
              <DragListItem
                index={i}
                list={filteredList}
                insertion={insertion}
                setInsertion={setInsertion}
              >
                {renderItem(item, i)}
              </DragListItem>
              <InsertionSlot
                index={i + 1}
                insertion={insertion}
                setInsertion={setInsertion}
                list={filteredList}
                setList={setList}
                spacing={spacing}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

DragList.defaultProps = {
  spacing: 16
};

export default DragList;
