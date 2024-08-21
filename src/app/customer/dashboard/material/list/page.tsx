"use client";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../../../ui/LoadingComponent";
import NotFound from "../../../../not-found";
import { ExtendedPreviewSubmitProps, formatCreatedDate, formatOrderRequestNumber } from ".";
import Link from "next/link";
import MaterialAction from "./MaterialAction";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getMaterialData } from "./api";
const Page = () => {
    const { data, error, isLoading, isError } = useQuery({ queryKey: ['materials'], queryFn: getMaterialData });
    const [showMaterialAction, setShowMaterialAction] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [heading, setHeading] = useState("")
    useGSAP(() => {
        if (showMaterialAction) {
            gsap.to(".materialAction", {
                top: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    }, [showMaterialAction]);
    const receiveFromChild = (shouldHide: boolean) => {
        if (shouldHide) setShowMaterialAction(false);
    };
    const showAction = (orderNumber: string, heading: string) => {
        setShowMaterialAction(true);
        setOrderNumber(orderNumber);
        setHeading(heading);
    };
    if (isLoading) {
        return <LoadingComponent />;
    }
    if (isError) {
        return <NotFound />;
    }
    return (
        <>
            <div className="w-[65vw]">
                <h1 className="subHeading">Material Orders</h1>
                {data.map((material: ExtendedPreviewSubmitProps, index: number) => (
                    <div
                        className="materialOrdersWrapper flex flex-col md:flex-row md:justify-between border-b-[1px] border-primaryDark"
                        key={index}
                    >
                        <div className="orderRequestNumber">
                            <h2 className="font-bold text-primaryDark">Order Req. Num.</h2>
                            <span className="text-primaryDark italic">
                                {formatOrderRequestNumber(material.materialOrderNumber)}
                            </span>
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
                                <span className="text-red-400 cursor-pointer">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => showAction((formatOrderRequestNumber(material.materialOrderNumber)), "Delete")}
                                    />
                                </span>
                                <Link href={`/customer/dashboard/material/list/${material._id}?view`}>
                                    <span className="text-green-400 cursor-pointer">
                                        <FontAwesomeIcon icon={faEye} />
                                    </span>
                                </Link>
                                <span className="text-blue-400 cursor-pointer">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        onClick={() => showAction((formatOrderRequestNumber(material.materialOrderNumber)), "Edit")}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showMaterialAction && (
                <div className="materialAction fixed top-[-100%] left-0 w-[100vw] h-[100vh] bg-black/70 z-100 flex justify-center items-center">
                    <MaterialAction orderNumber={orderNumber} hideMaterialAction={receiveFromChild} heading={heading} />
                </div>
            )}
        </>
    );
};
export default Page;
