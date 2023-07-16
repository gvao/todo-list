const observers = []

export const addObserver = observer => observers.push(observer)

export const removeObserver = observer => {
    const index = observers.indexOf(observer)
    if (index < 0) return console.log('observer not found')

    observers.splice(index, 1)
}

export const notifyObservers = (todos) => observers.forEach(observer => observer(todos))