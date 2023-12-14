import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {

        if(state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    } 
    )

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(addNotification(`You voted: ${anecdote.content}`))
        setTimeout(() => {
        dispatch(addNotification(''))
        }, 5000)
      }

      return (
        <div>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
          </div>
      )
}

export default AnecdoteList 