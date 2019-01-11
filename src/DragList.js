// @flow

import * as R from "ramda";
import React from "react";
import type { Node } from "react";
import classnames from "classnames";

import styles from "./drag-list.scss";

type ListItem = { content: any };

type Insertion = {
  index: number,
  item: ListItem,
  slider: {
    height: number,
    top0: number,
    y0: number,
    y: number
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

const InsertionSlot = ({
  index,
  insertion,
  setInsertion,
  list,
  setList,
  spacing
}) => {
  return (
    <div
      spacing={spacing}
      style={{
        height:
          spacing +
          (insertion && insertion.index === index ? insertion.slider.height : 0)
      }}
      onMouseEnter={() => {
        insertion && setInsertion({ ...insertion, index: index });
      }}
      onMouseUp={() => {
        if (insertion) {
          setList(R.insert(index, insertion.item, list));
          setInsertion(null);
        }
      }}
      className={styles.insertionSlot}
    />
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
  console.log(insertion);
  const filteredList = insertion
    ? list.filter(item => !R.equals(insertion.item, item))
    : list;
  const slidingElement = insertion ? renderItem(insertion.item, 0) : null;

  const topFromInsertion = ({ slider }) => {
    const { top0, y0, y } = slider;
    return top0 + (y - y0);
  };

  return (
    <div
      className={styles.dragList}
      onMouseMove={e =>
        insertion &&
        setInsertion({
          ...insertion,
          slider: { ...insertion.slider, y: e.clientY }
        })
      }
    >
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
              <div
                className={styles.element}
                onMouseDown={e => {
                  const {
                    top,
                    height
                  } = e.currentTarget.getBoundingClientRect();

                  setInsertion({
                    index: i,
                    item,
                    slider: {
                      height,
                      top0: top,
                      y0: e.clientY,
                      y: e.clientY
                    }
                  });
                }}
              >
                {renderItem(item, i)}
              </div>
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
