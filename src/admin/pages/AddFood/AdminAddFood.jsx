import React, { useState } from 'react';
import { assets } from '../../../assets/assets';
import { addFood } from '../../services/adminFoodService';
import { toast } from 'react-toastify';

const AddFood = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Pizza'
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error('Please select an image.');
            return;
        }
        try {
            await addFood(data, image);
            toast.success('Food added successfully.');
            setData({ name: '', description: '', category: 'Pizza', price: '' });
            setImage(null);
        } catch (error) {
            toast.error('Error adding food.');
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card col-md-4 mt-4">
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-1">
                            <label htmlFor="image" className="form-label d-block text-center">
                                Click here to upload image
                                <img
                                    src={image ? URL.createObjectURL(image) : assets.upload}
                                    alt="Upload"
                                    width={200}
                                    className="mx-auto d-block cursor-pointer"
                                />
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                hidden
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                placeholder="Mashroom Pizza"
                                className="form-control"
                                id="name"
                                required
                                name="name"
                                onChange={onChangeHandler}
                                value={data.name}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                placeholder="Write food description here..."
                                id="description"
                                rows="5"
                                required
                                name="description"
                                onChange={onChangeHandler}
                                value={data.description}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                name="category"
                                id="category"
                                className="form-control"
                                onChange={onChangeHandler}
                                value={data.category}
                            >
                                <option value="Pizza">Pizza</option>
                                <option value="Biryani">Biryani</option>
                                <option value="Cake">Cake</option>
                                <option value="Burger">Burger</option>                                
                                <option value="Thali">Thali</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Salad">Salad</option>
                                <option value="Ice cream">Ice cream</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="₹349"
                                className="form-control"
                                onChange={onChangeHandler}
                                value={data.price}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddFood;