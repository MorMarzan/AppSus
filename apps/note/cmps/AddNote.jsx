const { useState, useEffect } = React

export function AddNote() {
    const [isAddOpen, setIsAddOpen] = useState(false)

    useEffect(() => {
        const clickHandler = () => {
            setIsAddOpen(false)
          };

        window.addEventListener('click', clickHandler)

        return () => {
            window.removeEventListener('click', clickHandler)
        }
    }, [])

  return (
    <section className="add-note">
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Take a note..." />
    </section>
  )
}
