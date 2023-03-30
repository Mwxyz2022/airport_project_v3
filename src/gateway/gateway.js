const baseUrl = 'https://5e5cf5eb97d2ea0014796f01.mockapi.io/api/v1/airport'

export const fetchFlightListData = () =>
    fetch(baseUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch flights-list. Status: ${response.status} ${response.statusText}`,
                )
            }

            return response.json()
        })
        .catch(error => {
            throw new Error(error.message)
        })
