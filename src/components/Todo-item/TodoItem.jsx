export default function TodoItem({ todo, onComplete, onDelete, onRedo }) {
  const { completed, title } = todo;

  const handleCompleteClick = () => {
    onComplete(todo.id);
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  const handleRedoClick = () => {
    onRedo(todo.id)
  }

  return !completed ? (
    <>
      <div>{title}</div>
      <div className='todo__buttons'>
        <button
          onClick={handleCompleteClick}
          type='button'
          className='todo__button'
        >
          <img src='/images/complete.png' alt='complete' />
        </button>
        <button
          onClick={handleDeleteClick}
          type='button'
          className='todo__button'
        >
          <img src='/images/delete.png' alt='delete' />
        </button>
      </div>
    </>
  ) : (
    <>
      <div className='todo__completed'>{title}</div>
      <div className='todo__buttons'>
        <button
          onClick={handleRedoClick}
          type='button'
          className='todo__button'
        >
          <img src='/images/redo.png' alt='redo' />
        </button>
        <button
          onClick={handleDeleteClick}
          type='button'
          className='todo__button'
        >
          <img src='/images/delete.png' alt='delete' />
        </button>
      </div>
    </>
  );
}
