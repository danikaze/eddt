import { FunctionComponent, RefObject, useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { MessageType } from '@utils/msgs';

export interface VisualConsoleProps {
  messages: MessageType[];
  scrollRef: RefObject<HTMLDivElement>;
}

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    background: '#000',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    textAlign: 'left',
    fontFamily: 'monospace',
    fontSize: '12px',
  },
  messages: {
    padding: '1em',
    overflowY: 'auto',
  },
  msg: {
    whiteSpace: 'break-spaces',
    margin: 0,
  },
  logMsg: {
    color: '#e0e0e0',
  },
  errorMsg: {
    color: '#ff7b7b',
  },
}));

export const VisualConsole: FunctionComponent<VisualConsoleProps> = ({
  messages,
  scrollRef,
}) => {
  const [lastHeight, setLastHeight] = useState<number>(0);
  useEffect(() => {
    const elem = scrollRef.current!;
    const needsScroll =
      !lastHeight ||
      elem.scrollTop + elem.getBoundingClientRect().height >= lastHeight;
    setLastHeight(elem.scrollHeight);
    if (!needsScroll) return;
    elem.scrollTo(0, elem.scrollHeight);
  });

  const classes = useStyles();
  const msgs = messages.map(message);

  function message(msg: MessageType, key: number | string) {
    const className = `${classes.msg} ${
      msg.type === 'error' ? classes.errorMsg : classes.logMsg
    }`;

    return msg.text.split('\n').map((text, i) => (
      <pre key={`${key}-${i}`} className={className}>
        {text}
      </pre>
    ));
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.messages} ref={scrollRef}>
        {msgs}
      </div>
    </div>
  );
};
