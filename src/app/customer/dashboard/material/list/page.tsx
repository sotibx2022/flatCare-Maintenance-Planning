"use client"
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { getMaterialData } from "./api"
import { useQuery } from "@tanstack/react-query"
import LoadingComponent from "../../../../ui/LoadingComponent"
import NotFound from "../../../../not-found"
import { ExtendedPreviewSubmitProps, formatCreatedDate, formatOrderRequestNumber } from "."
import Link from "next/link"
const page = () => {
    const { data, error, isLoading, isError, isSuccess } = useQuery({ queryKey: ['materials'], queryFn: getMaterialData })
    if (isLoading) {
        return <LoadingComponent />
    }
    if (isError) {
        return <NotFound />
    }
    return (
        <div className="w-[65vw]">
            <h1 className="subHeading">Material Orderes</h1>
            {data.map((material: ExtendedPreviewSubmitProps, index: number) => {
                return <div className="materialOrdersWrapper flex flex-col md:flex-row md:justify-between border-b-[1px]  border-primaryDark" key={index}>
                    <div className="orderRequestNumebr">
                        <h2 className="font-bold text-primaryDark">Order Req. Num.</h2>
                        <span className="text-primaryDark italic">{formatOrderRequestNumber(material.materialOrderNumber)}</span>
                    </div>
                    <div className="NumberOfMaterials">
                        <h2 className="font-bold text-primaryDark">Num. of Materials</h2>
                        <span className="text-primaryDark italic">{material.materials.length} Items</span>
                    </div>
                    <div className="createdDate">
                        <h2 className="font-bold text-primaryDark">Created On</h2>
                        <span className="text-primaryDark italic">{formatCreatedDate(material.createdAt)}</span>
                    </div>
                    <div className="MaterialOrderStatus">
                        <h2 className="font-bold text-primaryDark">Status</h2>
                        <span className="text-primaryDark italic">Created</span>
                    </div>
                    <div className="MaterialOrderAction">
                        <h2 className="font-bold text-primaryDark">Action</h2>
                        <div className="actionDetails flex gap-1">
                            <Link href={`/customer/dashboard/material/list/${material._id}?delete`}
                            >
                                <span className='text-red-400 cursor-pointer'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                            </Link>
                            <Link href={`/customer/dashboard/material/list/${material._id}?view`}
                            > <span className='text-green-400 cursor-pointer'>
                                    <FontAwesomeIcon icon={faEye} />
                                </span></Link>
                            <Link href={`/customer/dashboard/material/list/${material._id}?edit`}
                            ><span className='text-blue-400 cursor-pointer'>
                                    <FontAwesomeIcon icon={faEdit} />
                                </span></Link>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}
export default page