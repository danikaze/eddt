import electron from 'electron';
import React, { useState, useEffect, createRef } from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { VisualConsole } from '@components/visual-console';
import { MessageType } from '@utils/msgs';

const ipcRenderer = electron.ipcRenderer || false;

const useStyles = makeStyles((theme: Theme) => {
  // tslint:disable: no-magic-numbers
  return createStyles({
    root: {},
  });
});

function usePage() {
  const classes = useStyles({});
  const [messages, setMessages] = useState<MessageType[]>([]);

  function addMessage(msg: MessageType) {
    setMessages((messages) => [...messages, msg]);
  }

  useEffect(() => {
    if (!ipcRenderer) return;
    ipcRenderer.on(IPC_MSG_CHANNEL, (event, msg) => {
      addMessage(msg);
    });
    setTimeout(() => {
      ipcRenderer.send(IPC_ACTIONS_CHANNEL, 'ready');
    }, 2000);

    return () => {
      ipcRenderer.removeAllListeners(IPC_MSG_CHANNEL);
    };
  }, []);

  return {
    classes,
    messages,
    scrollRef: createRef<HTMLDivElement>(),
  };
}

const Home = () => {
  const { classes, messages, scrollRef } = usePage();

  return (
    <React.Fragment>
      <Head>
        <title>EDDT - Elite Dangerous Desktop Tools</title>
      </Head>
      <div className={classes.root}>
        <VisualConsole messages={messages} scrollRef={scrollRef} />
      </div>
    </React.Fragment>
  );
};

export default Home;
