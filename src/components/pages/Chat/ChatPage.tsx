import React, {useEffect, useRef, useState} from 'react'

const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

export default ChatPage

export interface IChatMessage {
    message: string
    photo: string
    userId: number
    userName: string
}

const Chat: React.FC = () => {
    // const ws = useRef()

    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        let wsChanel: WebSocket

        const closeWsHandler = () => {
            console.log('socket closed')

            setTimeout(createChanel, 3000)
        }

        const createChanel = () => {
            if (wsChanel !== null) {
                ws?.removeEventListener('close', closeWsHandler)
            }

            wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            setWs(wsChanel)

            ws?.addEventListener('close', closeWsHandler)
        }
        createChanel()

        return () => {
            ws?.removeEventListener('close', closeWsHandler)
            ws?.close()
        }
    }, [])

    // useEffect(() => {
    //     const closeWsHandler = () => {
    //         console.log('socket closed')
    //     }
    //
    //     ws?.addEventListener('close', closeWsHandler)
    //
    //     return ws?.removeEventListener('close', closeWsHandler)
    // }, [ws])
    //
    // useEffect(() => {
    //     const openWsHandler = () => {
    //         console.log('opened again')
    //     }
    //
    //     ws?.addEventListener('open', openWsHandler)
    //
    //     return ws?.removeEventListener('open', openWsHandler)
    // }, [ws])

    return <div>
        <Messages ws={ws} />
        <AddMessageForm ws={ws} />
    </div>
}

const Messages: React.FC<{ws: WebSocket | null}> = ({ws}) => {

    const [messages, setMessages] = useState<IChatMessage[]>([])

    useEffect(() => {
        const handleMessageChange = (e: MessageEvent) => {
            console.log(JSON.parse(e.data))
            setMessages(state => [...state, ...JSON.parse(e.data)])
        }

        ws?.addEventListener('message', handleMessageChange)

        return () => ws?.removeEventListener('message', handleMessageChange)
    }, [ws])

    return <div style={{height: '500px', overflow: 'auto'}}>
        {
            messages.map((message, i) => (
                <Message key={i} message={message} />
            ))
        }
    </div>
}

const AddMessageForm: React.FC<{ws: WebSocket | null}> = ({ws}) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const readyHandler = () => {
            setReadyStatus('ready')
        }

        ws?.addEventListener('open', readyHandler)

        return () => ws?.removeEventListener('open', readyHandler)
    }, [ws])

    const onSubmit = () => {
        if (!message) return
        ws?.send(message)
        setMessage('')
    }

    return <form onSubmit={onSubmit}>
        <textarea name='message' value={message} onChange={e => setMessage(e.target.value)} />
        <button disabled={ws !== null || readyStatus !== 'ready'} type='submit'>Send</button>
    </form>
}

interface IMessageState {
    message: IChatMessage
}

const Message: React.FC<IMessageState> = ({message}) => {
    
    return <div>
        <img width={50} height={50} src={message.photo} alt='' />
        <b>{message.userId}</b>
        <p>{message.message}</p>
        <hr />
    </div>
}