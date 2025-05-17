import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL
export const RESTAURANT_SUPPLIERS_PATH = '/restaurant_suppliers'

export async function addRestaurantSupplier(supplierId) {
    return await fetch(`${API_URL}${RESTAURANT_SUPPLIERS_PATH}`, {
        method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            restaurant_id: 2,
            supplier_id: supplierId
        })
    })
}

export async function getRestaurantSuppliers() {
    const response = await fetch(`${API_URL}${RESTAURANT_SUPPLIERS_PATH}?restaurant_id=2&_expand=supplier`)
    return await response.json()
}