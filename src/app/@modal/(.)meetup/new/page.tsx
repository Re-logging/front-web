'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { z } from 'zod'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'

const MeetupFormSchema = z
  .object({
    title: z.string().min(1, '모임 이름을 입력해주세요'),
    content: z.string().min(1, '모임 소개를 입력해주세요'),
    location: z.string().min(1, '활동 장소를 입력해주세요'),
    region: z.string().min(1, '지역을 선택해주세요'),
    startDate: z.date({
      required_error: '시작일을 선택해주세요',
    }),
    endDate: z.date({
      required_error: '종료일을 선택해주세요',
    }),
    participantTarget: z.string().min(1, '모임원 자격을 입력해주세요'),
    supportDetails: z.string().min(1, '특이사항을 입력해주세요'),
    activityHours: z.string().min(1, '모임 시간을 입력해주세요'),
    contactPerson: z.string().min(1, '담당자 이름을 입력해주세요'),
    contactNumber: z
      .string({
        required_error: '연락처를 입력해주세요',
      })
      .regex(
        /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/,
        '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)',
      ),
    registrationLink: z
      .string({
        required_error: '지원 링크를 입력해주세요',
      })
      .url('올바른 URL 형식이 아닙니다'),
  })
  .refine(
    (data) => {
      return dayjs(data.endDate).isAfter(data.startDate)
    },
    {
      message: '종료일은 시작일 이후여야 합니다',
      path: ['endDate'],
    },
  )

export default function MeetupFormModal() {
  const router = useRouter()
  const form = useForm<z.infer<typeof MeetupFormSchema>>({
    resolver: zodResolver(MeetupFormSchema),
    defaultValues: {
      title: '',
      content: '',
      location: '',
      region: '',
      startDate: undefined,
      endDate: undefined,
      participantTarget: '',
      supportDetails: '',
      activityHours: '',
      contactPerson: '',
      contactNumber: '',
      registrationLink: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof MeetupFormSchema>) => {
    try {
      const formData = new FormData()

      // 날짜를 ISO 문자열로 변환
      const formattedData = {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      }

      // FormData에 데이터 추가
      Object.entries(formattedData).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await fetch('/api/ploggingMeetups', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('모임 등록에 실패했습니다')

      router.back()
      toast({
        title: '모임이 등록되었습니다',
        variant: 'default',
        duration: 1500,
      })
    } catch (error: any) {
      toast({
        title: '오류가 발생했습니다',
        description: `${error?.message}`,
        variant: 'destructive',
        duration: 1500,
      })
    }
  }

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent className="h-dvh w-full overflow-y-auto bg-white p-0 laptop:max-h-[689px] laptop:max-w-[800px]">
        <DialogHeader className="w-full items-center p-6 pb-2">
          <DialogTitle className="text-lg font-semibold">
            플로깅 모임 만들기
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="px-6 pb-4">
              <div className="w-full space-y-6">
                {/* 모임 이름 필드 */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        모임 이름 <span className="text-green">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="크루모임의 이름을 적어주세요"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 모임소개 및 활동목적 필드 */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        모임소개 및 활동목적
                        <span className="text-green">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="모임의 취지, 특성 등 100자 이내로 소개해주세요."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 지역 필드 */}
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        지역 <span className="text-green">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="예: 서울시 강남구" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 활동 장소 필드 */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        활동 장소 <span className="text-green">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="예: 을지로입구역 4번출국 00카페"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 날짜 선택 필드 */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    활동기간 <span className="text-green">*</span>
                  </Label>
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'w-[240px] pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value
                                    ? dayjs(field.value).format('YYYY-MM-DD')
                                    : '시작일'}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < dayjs().startOf('day').toDate()
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'w-[240px] pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value
                                    ? dayjs(field.value).format('YYYY-MM-DD')
                                    : '종료일'}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < dayjs().startOf('day').toDate()
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {/* 모임원 자격 필드 */}
                <FormField
                  control={form.control}
                  name="participantTarget"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        모임원 자격
                        <span className="text-green">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="예: 환경 이슈에 관심이 많은 30대"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*       모임시간 필드 */}
                <FormField
                  control={form.control}
                  name="activityHours"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        모임시간
                        <span className="text-green">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="숫자로 적어주세요. 예: 2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*       담당자 필드 */}
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        담당자
                        <span className="text-green">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="이름을 적어주세요. 예: 홍길동"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 연락처 필드 */}
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        연락처
                        <span className="text-green">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="연락받을 번호를 적어주세요. 예: 010-1234-5678"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 지원링크 필드 */}
                <FormField
                  control={form.control}
                  name="registrationLink"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        지원링크
                        <span className="text-green">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="지원받을 채널의 링크를 붙여넣어주세요. "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="p-6 pt-4">
              <div className="mx-auto flex w-full flex-col items-end gap-4 laptop:flex-row">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                  className="h-[48px] w-full bg-gray-200 text-white hover:bg-gray-300"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90"
                >
                  등록하기
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
