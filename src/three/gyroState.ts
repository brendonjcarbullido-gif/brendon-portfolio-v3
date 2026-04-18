/** Module-level flag for gyro UX; camera is driven via gyro-start / gyro-stop events. */
export let gyroActive = false

export const setGyroActive = (val: boolean) => {
  gyroActive = val
}
