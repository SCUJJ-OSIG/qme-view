export function useResize(ele: Element, func: (obj: { x: number, y: number }) => void) {

  let _clickStatus = false

  ele.addEventListener('mousedown', e => {
    _clickStatus = true
  })

  document.body.addEventListener('mouseup', () => {
    _clickStatus = false
  })

  document.body.addEventListener('mouseleave', () => {
    _clickStatus = false
  })

  document.body.addEventListener('mousemove', (e) => {
    if (!_clickStatus) return

    // get absolute mouse position offset by body
    const x = e.clientX
    const y = e.clientY

    func({ x, y }) // { x:x , y:y }
  })

}