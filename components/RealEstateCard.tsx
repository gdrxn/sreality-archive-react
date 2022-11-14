import Image from "next/image";
import { IRealEstate } from "../types";
type Props = { product: IRealEstate };

const RealEstateCard = (props: Props) => {
	return (
		<li className="w-96 h-[20.3rem] border border-gray-100 rounded-xl overflow-hidden shadow-2xl">
			<div className="relative w-full h-[15rem]">
				<Image
					className="object-cover"
					src={props.product.images[0]}
					layout="fill"
					alt={"Real estate photo"}
				/>
			</div>
			<div className="p-2">
				<h2 className="font-medium text-sm">{props.product.name}</h2>
				<h3 className="font-medium text-sm">{props.product.location}</h3>
				<h4 className="font-medium">{`${props.product.price} Kč`}</h4>
			</div>
		</li>
	);
};

export default RealEstateCard;
