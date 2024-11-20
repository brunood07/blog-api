import { CreatePaymentTypeUseCase } from "@/domain/payment/application/use-cases/create-payment-type-use-case";
import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";

const createPaymentTypeBodySchema = z.object({
  name: z.string(),
  quantity: z.string(),
  active: z.boolean().optional().default(true)
})

type createPaymentTypeBodyType = z.infer<typeof createPaymentTypeBodySchema>

@Controller("/payment-type")
export class CreatePaymentTypeController {
  constructor(private readonly createPaymentTypeUseCase: CreatePaymentTypeUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPaymentTypeBodySchema))
  async handle(@Body() body: createPaymentTypeBodyType) {
    const { name, quantity, active } = body;
    const result = await this.createPaymentTypeUseCase.execute({
      name,
      quantity,
      active
    })

    return result.value;
  }
}